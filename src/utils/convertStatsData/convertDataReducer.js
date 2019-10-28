// in src/dataProvider
import { DateTime } from 'luxon';

/**
 * @param Object payload
 * @returns {{}[]} array of rows
 */
export const convertData = ({ data = [], labels = [], query = {} }) => {
	const arrayTable = [];
	if (!data || !data.length || !labels || !labels.length || !query || (query.metrics && !query.metrics.length)) {
		return arrayTable;
	}
	for (let k = 0; k < query.dsp_id.length; k++) {
		for (let i = 0; i < labels.length; i++) {
			const dataByDate = {
				dsp_id: parseInt(query.dsp_id[k], 10),
				date: DateTime.fromISO(labels[i]).toISODate(),
			};
			for (let j = 0; j < query.metrics.length; j++) {
				dataByDate[query.metrics[j]] = data[k].metrics[j][i];
			}
			arrayTable.push(dataByDate);
		}
	}
	return arrayTable;
};

/**
 * @param Array rows
 * @returns {{}} object with sum of rows (labels)
 */
export const totalData = rows => {
	const tempObject = {};
	rows.forEach(item => {
		Object.keys(item).forEach(key => {
		  if(key !== 'date' && key !== 'dsp_id') {
        tempObject[key] = (tempObject[key] || 0) + item[key];
      }
		});
	});
	return tempObject;
};

const convertDataReducer = (state = {totals: {}, stats: []}, { payload }) => {
		const stats = convertData(payload);
		const totals = totalData(stats);
		return {
			...state,
			stats,
			totals,
		};
};

export default convertDataReducer;
