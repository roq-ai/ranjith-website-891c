import { UserInterface } from 'interfaces/user';
import { InvestigationInterface } from 'interfaces/investigation';
import { GetQueryInterface } from 'interfaces';

export interface ReportInterface {
  id?: string;
  description: string;
  customer_id?: string;
  investigation_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  investigation?: InvestigationInterface;
  _count?: {};
}

export interface ReportGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  customer_id?: string;
  investigation_id?: string;
}
