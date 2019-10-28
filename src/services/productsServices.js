import request from '../utils/request';
export async function query(params) {

  const query = {
    dsp_ids: params.dsp_ids.join(','),
    metrics: params.metrics.join(','),
    start_date: params.start_date,
    end_date: params.end_date,
  };
  return request('http://localhost:3000/stats/', );
}
/*
export async function findById(id) {
  const url = _.replace(blogByIdUrl, '{id}', id);
  return request({
    url   : url,
    method: 'get'
  });
}

export async function blogArticles(id, filter) {
  const fOptions = filter || {};
  const url = _.replace(blogArticlesUrl, '{id}', id);
  return request({
    url   : url,
    method: 'get',
    params: {
      filter: JSON.stringify(fOptions)
    }
  });
}
*/
