const diary = {
  namespaced: true,
  state: {
    today: {
      progress: 20,
      periods: [
        {
          uid: 1,
          id: 1,
          type: 1,
          subject: 3,
          period: 1,
          location: 1,
          director: 1
        },
        {
          uid: 2,
          id: 2,
          type: 1,
          subject: 2,
          period: 2,
          location: 2,
          director: 2
        },
        {
          uid: 3,
          id: 3,
          type: 2,
          subject: 1,
          period: 3,
          location: 3,
          director: 3
        }
      ]
    },
    nextDays: [
      {
        date: 191014,
        canceledCourses: [
          {
            subject: 3,
            details: "Détails du cours annulé."
          }
        ],
        testsDsts: [
          {
            type: 1,
            subject: 2,
            content: "Contenu du test de lundi."
          },
          {
            type: 2,
            subject: 2,
            content: "Contenu du DST de lundi."
          }
        ],
        homework: [
          {
            subject: 1,
            content: "Contenu du devoir de lundi."
          }
        ]
      },
      {
        date: 191015,
        testsDsts: [
          {
            type: 2,
            subject: 1,
            content: "Contenu du DST de mardi."
          },
          {
            type: 1,
            subject: 2,
            content: "Contenu du test de mardi."
          }
        ],
        homework: [
          {
            subject: 3,
            content: "Contenu du devoir de mardi."
          }
        ]
      },
      {
        date: 191016,
        testsDsts: [
          {
            type: 2,
            subject: 1,
            content: "Jour 3."
          },
          {
            type: 1,
            subject: 2,
            content: "Contenu du test de mercredi."
          }
        ],
        homework: [
          {
            subject: 3,
            content: "Contenu du devoir de mercredi."
          }
        ]
      },
      {
        date: 191017,
        testsDsts: [
          {
            type: 2,
            subject: 1,
            content: "Jour 4."
          },
          {
            type: 1,
            subject: 2,
            content: "Contenu du test de jeudi."
          }
        ],
        homework: [
          {
            subject: 3,
            content: "Contenu du devoir de jeudi."
          }
        ]
      }
    ]
  }
}

export default diary