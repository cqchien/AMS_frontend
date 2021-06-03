import request from '@/utils/request';

export type GetClassesParamsType = {
  order: string;
  page: number;
  take: number;
  q?: string;
  isFinish: boolean;
};

export type CreateClassParamsType = {
  courseCode: string;
  type: string;
  desc: string;
  startTime: string;
  endTime: string;
  teacher: string;
};
export async function getAllClasses(params: GetClassesParamsType): Promise<any> {
  return request('class', {
    method: 'GET',
    data: params,
  });
}

export async function createNewClass(params: CreateClassParamsType): Promise<any> {
  console.log('para', params);
  return request('class', {
    method: 'POST',
    data: params,
  });
}
