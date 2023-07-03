import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { investigationValidationSchema } from 'validationSchema/investigations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.investigation
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getInvestigationById();
    case 'PUT':
      return updateInvestigationById();
    case 'DELETE':
      return deleteInvestigationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getInvestigationById() {
    const data = await prisma.investigation.findFirst(convertQueryToPrismaUtil(req.query, 'investigation'));
    return res.status(200).json(data);
  }

  async function updateInvestigationById() {
    await investigationValidationSchema.validate(req.body);
    const data = await prisma.investigation.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteInvestigationById() {
    const data = await prisma.investigation.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
