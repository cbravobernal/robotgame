var npmProperties = require('../../../package.json');

module.exports =
  { title: 'Kill that robot'
  , description: npmProperties.description
  , port: 3017
  , liveReloadPort: 3018
  , mute: true
  , showStats: false
  , size:
    { x: 800
    , y: 600
    }
  , analyticsId: ''
  };
