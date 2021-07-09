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
  qrCode: string;
  QRCreatedAt: string;
};
export async function getAllClasses(params: GetClassesParamsType): Promise<any> {
  return request(
    `class?order=${params.order}&page=${params.page}&take=${params.take}&isFinish=${params.isFinish}`,
    {
      method: 'GET',
    },
  );
}

export async function createNewClass(params: CreateClassParamsType): Promise<any> {
  return request('class', {
    method: 'POST',
    data: params,
  });
}
