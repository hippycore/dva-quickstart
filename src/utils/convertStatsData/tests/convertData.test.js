import { convertData, totalData } from '../convertDataReducer';

const payloadOneDSP = {
	query: {
		dsp_id: ['5'],
		metrics: ['bidrequest', 'bidresponse', 'impressions', 'spend'],
		dimensions: ['dsp_id'],
		group: 'day',
		start_date: '22-10-2019',
		end_date: '26-10-2019',
		sort: ['-spend'],
	},
	data: [
		{
			dimensions: [
				{
					name: '5',
				},
			],
			metrics: [
				[205, 655, 894, 107, 619],
				[685, 762, 959, 154, 175],
				[540, 966, 508, 446, 502],
				[861, 954, 821, 253, 41],
			],
		},
	],
	labels: [
		'2019-10-22T00:00:00',
		'2019-10-23T00:00:00',
		'2019-10-24T00:00:00',
		'2019-10-25T00:00:00',
		'2019-10-26T00:00:00',
	],
};

const payloadMultiplyDSP = {
	query: {
		dsp_id: ['5', '7', '151'],
		metrics: ['bidrequest', 'bidresponse', 'impressions', 'spend'],
		dimensions: ['dsp_id'],
		group: 'day',
		start_date: '22-10-2019',
		end_date: '22-10-2019',
		sort: ['-spend'],
	},
	data: [
		{
			dimensions: [
				{
					name: '5',
				},
			],
			metrics: [[899], [168], [424], [313]],
		},
		{
			dimensions: [
				{
					name: '7',
				},
			],
			metrics: [[621], [202], [590], [427]],
		},
		{
			dimensions: [
				{
					name: '151',
				},
			],
			metrics: [[526], [438], [311], [578]],
		},
	],
	labels: ['2019-10-22T00:00:00'],
};

describe('convertData', () => {
	it('should generate array of objects for ONE dsp', () => {
		const result = [
			{
				dsp_id: 5,
				date: '2019-10-22',
				bidrequest: 205,
				bidresponse: 685,
				impressions: 540,
				spend: 861,
			},
			{
				dsp_id: 5,
				date: '2019-10-23',
				bidrequest: 655,
				bidresponse: 762,
				impressions: 966,
				spend: 954,
			},
			{
				dsp_id: 5,
				date: '2019-10-24',
				bidrequest: 894,
				bidresponse: 959,
				impressions: 508,
				spend: 821,
			},
			{
				dsp_id: 5,
				date: '2019-10-25',
				bidrequest: 107,
				bidresponse: 154,
				impressions: 446,
				spend: 253,
			},
			{
				dsp_id: 5,
				date: '2019-10-26',
				bidrequest: 619,
				bidresponse: 175,
				impressions: 502,
				spend: 41,
			},
		];
		expect(convertData(payloadOneDSP)).toEqual(result);
	});

	it('should generate array of objects for MULTIPLY dsps', () => {
		const result = [
			{
				dsp_id: 5,
				date: '2019-10-22',
				bidrequest: 899,
				bidresponse: 168,
				impressions: 424,
				spend: 313,
			},
			{
				dsp_id: 7,
				date: '2019-10-22',
				bidrequest: 621,
				bidresponse: 202,
				impressions: 590,
				spend: 427,
			},
			{
				dsp_id: 151,
				date: '2019-10-22',
				bidrequest: 526,
				bidresponse: 438,
				impressions: 311,
				spend: 578,
			},
		];
		expect(convertData(payloadMultiplyDSP)).toEqual(result);
	});
});

describe('totalData', () => {
	it('should generate objects with sum values of given array', () => {
		const payload = convertData(payloadMultiplyDSP);
		const result = {
			bidrequest: 2046,
			bidresponse: 808,
			impressions: 1325,
			spend: 1318,
		};
		expect(totalData(payload)).toEqual(result);
	});
});

/*

dates: {

        start
        end
    },
    dsps: [{-id:
            -name
        endpoints: [{-endpoint_id
        }],
        active: true || false,
    }]

user: {
        id,
        email,
        password
    }

    <
    endpoints bydsp start, end, dsp_id[]
    [{
        id,
        dspName,
        bid request,
        bid responses,
        impressions,
        spend
    }]

endpoints_total byname {
    id,
    dspName,
    bid request,
    bid responses,
    impressions,
    spend
}

endpoints byname start, end, dsp_id
    [{
        id,
        date,
        bid request,
        bid responses,
        impressions,
        spend
    }]

endpoints_total bydate {
    id,
    dspName,
    bid request,
    bid responses,
    impressions,
    spend
}
endpoints bydate start, end, dsp_id
    [{
        id,
        dspId,
        bid request,
        bid responses,
        impressions,
        spend
    }]
 */
