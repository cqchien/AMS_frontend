import { getAllClasses } from '@/services/class';
import { Effect, Reducer } from './../.umi/plugin-dva/connect';

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

export type ClassRoomModelState = {
  classRooms?: ClassRoom[];
};

export type ClassRoomModelType = {
  namespace: 'class';
  state: ClassRoomModelState;
  effects: {
    getAllClasses: Effect;
  };
  reducers: {
    // showListClass: Reducer<ClassRoomModelState>;
  };
};

const ClassRoomModel: ClassRoomModelType = {
  namespace: 'class',

  state: {
    classRooms: [],
  },

  effects: {
    *getAllClasses({payload}, { call, put }) {
      const response = yield call(getAllClasses, payload);
      console.log(response);
    },
  },

  reducers: {
    // showListClass(state, action) {
    // }
  },
};

export default ClassRoomModel;