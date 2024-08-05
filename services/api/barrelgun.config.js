const defaultLineTemplate = (file) => `export * from '${file}';`;
const fileTemplate = (files, lineTemplate = defaultLineTemplate) =>
  `${files.map((file) => lineTemplate(file)).join('\n')}`;

/**
 * BarrelGun configuration file
 * @see https://www.npmjs.com/package/barrelgun
 * @type {import("barrelgun").BarrelgunConfig["barrels"]} */
const barrels = [
  {
    path: 'src/{auth,health,role,user}/index.ts',
    files: ['*.{controller,module,service}.ts'],
    fileTemplate: fileTemplate,
  },
  {
    path: ['src/services/*/dto.ts'],
    files: '*.dto.ts',
    fileTemplate: fileTemplate,
  },
  {
    path: ['src/services/*/service.ts'],
    files: '*.service.ts',
    fileTemplate: fileTemplate,
  },
  {
    path: ['src/lib/**/index.ts'],
    files: '*.{decorator,enum,model}.ts',
    fileTemplate: fileTemplate,
  },
  {
    path: 'src/lib/index.ts',
    files: '*.ts',
    fileTemplate: fileTemplate,
  },
];

module.exports = { barrels };
