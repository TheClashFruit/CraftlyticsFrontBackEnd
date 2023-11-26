export default async function handler(req, res) {
  res.json({
    monthly: {
      free: {
        price: 0,
        features: {
          projects: 10,
          teamMembers: 4,
          metrics: 2,
          data: {
            retention: {
              amount: 2,
              type: 'week'
            },
            access: 'basic',
            export: false
          }
        }
      },
      basic: {
        price: 4.99,
        features: {
          projects: 25,
          teamMembers: 9,
          metrics: 6,
          data: {
            retention: {
              amount: 6,
              type: 'week'
            },
            access: 'basic',
            export: true
          }
        }
      },
      premium: {
        price: 9.99,
        features: {
          projects: -1,
          teamMembers: -1,
          metrics: -1,
          data: {
            retention: {
              amount: 1,
              type: 'year'
            },
            access: 'advanced',
            export: true
          }
        }
      },
      enterprise: {
        price: 49.99,
        features: {
          projects: -2,
          teamMembers: -2,
          metrics: -2,
          data: {
            retention: {
              amount: 0,
              type: 'custom'
            },
            access: 'all',
            export: true
          }
        }
      }
    },
    yearly: {
      free: {
        price: 0,
        features: {
          projects: 10,
          teamMembers: 4,
          metrics: 2,
          data: {
            retention: {
              amount: 2,
              type: 'week'
            },
            access: 'basic',
            export: false
          }
        }
      },
      basic: {
        price: 49.99,
        features: {
          projects: 25,
          teamMembers: 9,
          metrics: 6,
          data: {
            retention: {
              amount: 6,
              type: 'week'
            },
            access: 'basic',
            export: true
          }
        }
      },
      premium: {
        price: 99.99,
        features: {
          projects: -1,
          teamMembers: -1,
          metrics: -1,
          data: {
            retention: {
              amount: 1,
              type: 'year'
            },
            access: 'advanced',
            export: true
          }
        }
      },
      enterprise: {
        price: 499.99,
        features: {
          projects: -2,
          teamMembers: -2,
          metrics: -2,
          data: {
            retention: {
              amount: 0,
              type: 'custom'
            },
            access: 'all',
            export: true
          }
        }
      }
    }
  });
}