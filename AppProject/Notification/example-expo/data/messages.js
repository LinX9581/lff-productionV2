export default [
  {
    _id: 7,
    text: '#QQQQQQQQQQQ',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
  },
  // {
  //   _id: 6,
  //   text: 'Paris',
  //   createdAt: new Date(),
  //   user: {
  //     _id: 2,
  //     name: 'React Native',
  //   },
  //   image:
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/280px-Paris_-_Eiffelturm_und_Marsfeld2.jpg',
  //   sent: true,
  //   received: true,
  // },
  {
    _id: 5,
    text: 'QQQQQQQQQQQQQ',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
  },
  {
    _id: 4,
    text: 'QQQQ',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'LifeForFun',
    },
    sent: true,
    received: true,
    // location: {
    //   latitude: 48.864601,
    //   longitude: 2.398704,
    // },
  },
  {
    _id: 3,
    text: '開發reactnative',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
  },
  {
    _id: 2,
    text: '有一半的時間在debug',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
    sent: true,
    received: true,
  },
  {
    _id: 1,
    text: 'ReactNative 好多Bug',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Developer',
    },
  },
  {
    _id: 10,
    text: '選擇活動',
    createdAt: new Date(),
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
      values: [
        {
          title: '活動1',
          value: 'yes',
        },
        {
          title: '活動2',
          value: 'yes_picture',
        },
        {
          title: '活動3',
          value: 'no',
        },
      ],
    },
    user: {
      _id: 2,
      name: 'LifeFor',
    },
  },
  // {
  //   _id: 20,
  //   text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
  //   createdAt: new Date(),
  //   quickReplies: {
  //     type: 'checkbox', // or 'checkbox',
  //     values: [
  //       {
  //         title: 'Yes',
  //         value: 'yes',
  //       },
  //       {
  //         title: 'Yes, let me show you with a picture!',
  //         value: 'yes_picture',
  //       },
  //       {
  //         title: 'Nope. What?',
  //         value: 'no',
  //       },
  //     ],
  //   },
  //   user: {
  //     _id: 2,
  //     name: 'React Native',
  //   },
  // },
  // {
  //   _id: 30,
  //   createdAt: new Date(),
  //   video: 'https://media.giphy.com/media/3o6ZthZjk09Xx4ktZ6/giphy.mp4',
  //   user: {
  //     _id: 2,
  //     name: 'React Native',
  //   },
  // },
]
