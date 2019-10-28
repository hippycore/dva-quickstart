import pathToRegexp from "path-to-regexp";
import { query } from "../services/productsServices";
import encodeParams from "../utils/encodeParams";
import request from "../utils/request";
import convertDataReducer from "../utils/convertStatsData/convertDataReducer";

export default {
  namespace: "products",
  state: {
    total: {},
    data: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp("/").exec(pathname);
        if (match) {
          dispatch({ type: "fetch" });
        }
      });
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const params = {
        start_date: "09-10-2019",
        end_date: "26-10-2019",
        dsp_ids: [5, 6].join(","),
        metrics: ["bidrequest", "bidresponse", "impressions", "spend"].join(",")
      };
      const { data } = yield call(
        request,
        "http://10.10.201.35:3002/stats/?" + encodeParams(params)
      );
      yield put({ type: "show", payload: data });
    }
  },
  reducers: {
    show: (state, { payload }) => {

      return convertDataReducer(state, { payload })
    },
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    }
  }
};

