import { getAllClasses } from '@/services/class';
import type { Effect, Reducer } from './../.umi/plugin-dva/connect';

export type ClassRoom = {
  id?: string;
  courseCode?: string;
  type?: string;
  desc?: string;
  room?: string;
  startTime?: string;
  endTime?: string;
  qrCode?: string;
};

export type MetaData = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
  take: number;
};

export type ClassRoomModelState = {
  classRooms?: ClassRoom[];
  meta?: MetaData;
};

export type ClassRoomModelType = {
  namespace: 'classRoom';
  state: ClassRoomModelState;
  effects: {
    getAllClasses: Effect;
  };
  reducers: {
    showListClass: Reducer<ClassRoomModelState>;
  };
};

const ClassRoomModel: ClassRoomModelType = {
  namespace: 'classRoom',

  state: {
    classRooms: [],
  },

  effects: {
    *getAllClasses({ payload }, { call, put }) {
      const response = yield call(getAllClasses, payload);
      yield put({
        type: 'showListClass',
        payload: response,
      });
    },
  },

  reducers: {
    showListClass(state, { payload }) {
      return {
        ...state,
        classRooms: payload.data,
        meta: payload.meta,
      };
    },
  },
};

export default ClassRoomModel;
