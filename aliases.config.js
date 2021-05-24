const path = require('path');

const aliases = {
    '@': 'src',
    '@src': 'src',
    '@game': 'src/game',
    '@router': 'src/router',
    '@views': 'src/router/views',
    '@layouts': 'src/router/layouts',
    '@components': 'src/components',
    '@assets': 'src/assets',
    '@utils': 'src/utils',
    '@state': 'src/state',
};

module.exports = {
    webpack: {},
};

for (const alias in aliases) {
    const aliasTo = aliases[alias];
    module.exports.webpack[alias] = resolveSrc(aliasTo);
}


function resolveSrc(_path) {
    //path.resolve로 플랫폼 별 구분 기호를 구분 기호로 사용하여 지정된 모든 경로를 결합한 다음 결과 경로를 정규화합니다.
    return path.resolve(__dirname, _path);
}