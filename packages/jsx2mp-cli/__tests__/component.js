const { readFileSync } = require('fs');
const cp = require('child_process');

const compileCommand = 'jsx2mp build --type component --entry ./component --dist ./dist';

let jsonContent, jsContent, axmlContent;

beforeAll(() => {
  // TODO:
  // link self
  // link loader
  // cd loader . link compiler
  cp.execSync(`cd demo && npm install && ${compileCommand}`);
  // read from file and get compiled result
  jsonContent = readFileSync('demo/dist/component.json', {encoding: 'utf8'});
  jsContent = readFileSync('demo/dist/component.js', {encoding: 'utf8'});
  axmlContent = readFileSync('demo/dist/component.axml', {encoding: 'utf8'});

})

afterAll(() => {
  // TODO:
  // cp.execSync('npm unlink');
  // cp.execSync('rm -rf demo/dist');
})

describe('Component compiled result', () => {
  it('should return correct axml', () => {
    expect(axmlContent).toEqual(
`<block a:if="{{$ready}}">
<rax-view __tagId="0">Hello World!</rax-view>
</block>`
    );
  });

  it('should return correct js', () => {
    expect(jsContent).toEqual(
`import { createComponent as __create_component__ } from "./npm/jsx2mp-runtime";

const __def__ = function Index() {
  this._updateData({});

  this._updateMethods({});
};

Component(__create_component__(__def__));`
    );
  });

  it('should return correct json', () => {
    expect(jsonContent).toEqual(
`{
  "component": true,
  "usingComponents": {
    "rax-view": "./npm/rax-view/lib/miniapp/index"
  }
}
`
    );
  });
})
