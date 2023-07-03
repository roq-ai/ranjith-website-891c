import axios from 'axios';
import queryString from 'query-string';
import { InvestigationInterface, InvestigationGetQueryInterface } from 'interfaces/investigation';
import { GetQueryInterface } from '../../interfaces';

export const getInvestigations = async (query?: InvestigationGetQueryInterface) => {
  const response = await axios.get(`/api/investigations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createInvestigation = async (investigation: InvestigationInterface) => {
  const response = await axios.post('/api/investigations', investigation);
  return response.data;
};

export const updateInvestigationById = async (id: string, investigation: InvestigationInterface) => {
  const response = await axios.put(`/api/investigations/${id}`, investigation);
  return response.data;
};

export const getInvestigationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/investigations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInvestigationById = async (id: string) => {
  const response = await axios.delete(`/api/investigations/${id}`);
  return response.data;
};
