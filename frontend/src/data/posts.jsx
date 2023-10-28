
export const posts = [
	{
		id: '1',
		type: 'prediction',
		content: `1Filistin ile İsrail arasında yaşanan çatışmaların sona ermesi için 1 hafta içinde ateşkes ilan edilecek.`,
		prediction: {
			partipicated: true,
			participants: 10, //10 katılımcı = 10p
			bets: 3.25,
			startOfTime: '2023-11-27T14:10:00',
			endOfTime: '2023-11-02T00:43:40',
            
			answers: [
				{
					id: 1,
					text: 'Select 1',
					participants: 8
				},
				{
					id: 2,
					text: 'Select 2',
					participants: 1
				},
				
			]
		},
		account: {
			avatar: `/person1.jpeg`,
			username: 'testkahin',
			fullName: 'Test Kahin',
			isVerified: true //verified = 20p
		},
		stats: {
			comments: 1, //1 yorum = 2p
			share: 0,
			trust: 18, //10trust = 10p
			view: 1
		}
	},
    {
		id: '2',
		type: 'prediction',
		content: `2Bitcoin 1 hafta içinde 50.000$ seviyesini görecek.`,
		prediction: {
			partipicated: false,
			participants: 10,
			bets: 1.5,
			startOfTime: '2023-10-27T10:00:00',
			endOfTime: '2023-11-28T01:40:40',
            
			answers: [
				{
					id: 1,
					text: 'Select 1',
					participants: 8
				},
				{
					id: 2,
					text: 'Select 2',
					participants: 1
				},
				
			]
		},
		account: {
			avatar: '/person2.jpeg',
			username: 'testkahin2',
			fullName: 'Test Kahin 2',
			isVerified: false
		},
		stats: {
			comments: 0,
			share: 40,
			trust: 10,
			view: 12
		}
	},
    {
		id: '3',
		type: 'prediction',
		content: `3Biden ABD başkanlığından istifa edecek.`,
		prediction: {
			partipicated: true,
			participants: 5,
			bets: 10,
			startOfTime: '2022-10-27T10:00:00',
			endOfTime: '2023-11-10T00:55:40',
            
			answers: [
				{
					id: 1,
					text: 'Select 1',
					participants: 8
				},
				{
					id: 2,
					text: 'Select 2',
					participants: 1
				},
				
			]
		},
		account: {
			avatar: '/person3.jpeg',
			username: 'testkahin3',
			fullName: 'Test Kahin3',
			isVerified: false
		},
		stats: {
			comments: 41,
			share: 17,
			trust: 122,
			view: 50
		}
	},
    {
		id: '4',
		type: 'prediction',
		content: `4Bu sene İzmir'de 7 şiddetinde deprem olacak.`,
		prediction: {
			partipicated: false,
			participants: 11,
			bets: 0.5,
			startOfTime: '2023-09-28T10:00:00',
			endOfTime: '2023-11-28T00:40:40',
            
			answers: [
				{
					id: 1,
					text: 'Select 1',
					participants: 8
				},
				{
					id: 2,
					text: 'Select 2',
					participants: 1
				},
				
			]
		},
		account: {
			avatar: '/person4.jpeg',
			username: 'testkahin3',
			fullName: 'Test Kahin3',
			isVerified: false
		},
		stats: {
			comments: 0,
			share: 2,
			trust: 20,
			view: 100
		}
	},
    {
		id: '5',
		type: 'prediction',
		content: `5Filistin ile İsrail arasında yaşanan çatışmaların sona ermesi için 1 hafta içinde ateşkes ilan edilecek.`,
		prediction: {
			partipicated: false,
			participants: 12,
			bets: 1.22141,
			startOfTime: '2023-10-27T10:00:00',
			endOfTime: '2023-12-28T00:40:40',
            
			answers: [
				{
					id: 1,
					text: 'Select 1',
					participants: 8
				},
				{
					id: 2,
					text: 'Select 2',
					participants: 1
				},
				
			]
		},
		account: {
			avatar: '/person1.jpeg',
			username: 'testkahin',
			fullName: 'Test Kahin',
			isVerified: true
		},
		stats: {
			comments: 6,
			share: 12,
			trust: 53,
			view: 20
		}
	},
    {
		id: '6',
		type: 'prediction',
		content: `6Filistin ile İsrail arasında yaşanan çatışmaların sona ermesi için 1 hafta içinde ateşkes ilan edilecek.`,
		prediction: {
			partipicated: false,
			participants: 12,
			bets: 250,
			startOfTime: '2023-10-27T10:00:00',
			endOfTime: '2024-01-28T00:40:40',
            
			answers: [
				{
					id: 1,
					text: 'Select 1',
					participants: 8
				},
				{
					id: 2,
					text: 'Select 2',
					participants: 1
				},
				
			]
		},
		account: {
			avatar: '/person2.jpeg',
			username: 'testkahin',
			fullName: 'Test Kahin',
			isVerified: false
		},
		stats: {
			comments: 3,
			share: 15,
			trust: 12,
			view: 40
		}
	},
	
	
]