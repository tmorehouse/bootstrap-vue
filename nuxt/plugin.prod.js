import Vue from 'vue';
<% if (!options.treeShake) { %>
import BootstrapVue from 'bootstrap-vue/src';

Vue.use(BootstrapVue, <%= JSON.stringify(options.config || {}, undefined, 2) %>);
<% } %>

<% if (options.treeShake) { %>

<%= options.componentPlugins.reduce((acc, plugin) => {
    const path = options.kebabCase(plugin.replace(/Plugin$/, ''))
    acc += `import ${plugin} from 'bootstrap-vue/src/components/${path}';\n`
    return acc
}, '') %>

<%= options.directivePlugins.reduce((acc, plugin) => {
  const path = options.kebabCase(plugin.replace(/^VB|Plugin$/g, ''))
  acc += `import ${plugin} from 'bootstrap-vue/src/directives/${path}';\n`
  return acc
}, '') %>

<% if (options.components.length) { %>
import {
  <%= options.components.join(',\n  ') %>
} from 'bootstrap-vue/src/components';
<% } %>

<% if (options.directives.length) { %>
import {
  <%= options.directives.join(',\n  ') %>
} from 'bootstrap-vue/src/directives';
<% } %>

<% if (options.config) { %>
import BVConfigPlugin from 'bootstrap-vue/src/bv-config';

Vue.use(BVConfigPlugin, <%= JSON.stringify(options.config, undefined, 2) %>)'
<% } %>

<%=
options.componentPlugins.reduce((acc, cp) => (acc += `Vue.use(${cp});\n` ), '')
%><%=
options.directivePlugins.reduce((acc, dp) => (acc += `Vue.use(${dp});\n` ), '')
%><%=
options.components.reduce((acc, c) => (acc += `Vue.component('${c}', ${c});\n` ), '')
%><%=
options.directives.reduce((acc, d) => (acc += `Vue.directive('${d.replace(/^VB/, 'B')}', ${d});\n` ), '')
%>

<% } %>
