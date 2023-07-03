import { ReportInterface } from 'interfaces/report';
import { CompanyInterface } from 'interfaces/company';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InvestigationInterface {
  id?: string;
  status: string;
  company_id?: string;
  customer_id?: string;
  created_at?: any;
  updated_at?: any;
  report?: ReportInterface[];
  company?: CompanyInterface;
  user?: UserInterface;
  _count?: {
    report?: number;
  };
}

export interface InvestigationGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  company_id?: string;
  customer_id?: string;
}
