let baseUrl;
if (location.port == '4000') {
  baseUrl = location.protocol + '//' + location.hostname + ':4001';
} else {
  baseUrl = '/docu-microfrontend';
}
const getDocuItems = () => {
  return fetch('/navigation-generated.json', {
    headers: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    }
  }).then(function (obj) {
    return obj.json();
  }).then(function (json) {
    return json.map((child) => {
      child.viewUrl = child.viewUrl.replace('__BASE_URL__', baseUrl);
      return child;
    });
  }).catch(function (err) {
    console.error(`Error: ${err}`);
  })
}

class Navigation {
  nodes = {
    defaultChildNode: 'docs',
    children: [
      {
        label: 'About Luigi',
        externalLink: {
          url: 'https://luigi-project.io/about',
          sameWindow: true
        }
      },
      {
        pathSegment: 'docs',
        label: 'Documentation',
        children: getDocuItems(),
        context: {
          coreBaseUrl: window.location.origin
        }
      },
      {
        label: 'Twitter',
        externalLink: {
          url: 'https://twitter.com/luigiprojectio'
        },
        icon: 'twitter'
      },
      {
        label: 'Slack',
        externalLink: {
          url: 'https://slack.luigi-project.io'
        },
        icon: 'slack'
      },
      {
        label: 'Github',
        externalLink: {
          url: 'https://github.com/SAP/luigi'
        },
        icon: 'github'
      }
    ]
  };

  getProductSwitcherItems = () => {
    const items = [
      {
        icon:
          'https://pbs.twimg.com/profile_images/1143452953858183170/QLk-HGmK_bigger.png',
        label: 'hybris',
        externalLink: {
          url: 'https://www.hybris.com',
          sameWindow: false
        }
      }
    ];
    return items;
  };

  getProfileItems = () => {
    const items = [
      {
        label: 'Luigi in Github',
        externalLink: {
          url: 'https://github.com/SAP/luigi',
          sameWindow: false
        }
      }
    ];
    return items;
  };
}

export const navigation = new Navigation();
