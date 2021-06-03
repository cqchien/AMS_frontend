import { getAllClasses, createNewClass } from '@/services/class';
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
  visibleCreateClass?: boolean;
};

export type ClassRoomModelType = {
  namespace: 'classRoom';
  state: ClassRoomModelState;
  effects: {
    getAllClasses: Effect;
    createNewClass: Effect;
  };
  reducers: {
    showListClass: Reducer<ClassRoomModelState>;
    handleVisibleCreateClass: Reducer<ClassRoomModelState>;
  };
};

const ClassRoomModel: ClassRoomModelType = {
  namespace: 'classRoom',

  state: {
    classRooms: [],
    visibleCreateClass: false,
  },

  effects: {
    *getAllClasses({ payload }, { call, put }) {
      const response = yield call(getAllClasses, payload);
      yield put({
        type: 'showListClass',
        payload: response,
      });
    },

    *createNewClass({ payload }, { call, put }) {
      console.log('pay', payload);
      const response = yield call(createNewClass, payload);
      if (response) {
        yield put({
          type: 'handleVisibleCreateClass',
          payload: false,
        });
      }
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

    handleVisibleCreateClass(state, { payload }) {
      return {
        ...state,
        visibleCreateClass: payload,
      };
    },
  },
};

export default ClassRoomModel;
