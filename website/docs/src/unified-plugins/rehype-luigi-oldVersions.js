import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
// import versions from '../../public/versions.json' assert { type: "json" };
import * as fs from 'fs';
var versions = JSON.parse(fs.readFileSync('../../public/versions.json').toString());
export default function oldVersion() {
  return function transformer(tree) {
    visit(tree, ['comment'], function(node, index, parent) {
      if (node.type === 'comment' && node.value.trim() === 'oldVersionsDropdown') {
        var wrapper = h('div.custom-select');
        var oldVerDropdown_1 = h('select.oldverdrop');
        oldVerDropdown_1.properties.onchange =
          "window.open('https://github.com/SAP/luigi/blob/' + event.target.value + '/docs/README.md', '_blank'); event.target.value=0;";
        wrapper.children.push(oldVerDropdown_1);
        parent.children.splice(index + 1, 0, wrapper);
        var tagLinks_1 = [];
        var minors_1 = {};
        versions.forEach(function(tag) {
          if (tag.name.indexOf('v') === 0 && tag.name.indexOf('-') < 0) {
            var vInfo = tag.name.split('.');
            if (vInfo && vInfo.length === 3) {
              var minor = vInfo[0] + '.' + vInfo[1];
              if (!minors_1[minor]) {
                minors_1[minor] = tag;
                tagLinks_1.push(tag);
              }
            }
          }
        });
        var chooseOption = h('option', 'Choose a version');
        chooseOption.properties.value = '0';
        chooseOption.properties.style = 'display:none;';
        oldVerDropdown_1.children.push(chooseOption);
        tagLinks_1.slice(1).forEach(function(tag) {
          var tagOption = h('option', tag.name);
          oldVerDropdown_1.children.push(tagOption);
        });
      }
    });
  };
}
//# sourceMappingURL=rehype-luigi-oldVersions.js.map
