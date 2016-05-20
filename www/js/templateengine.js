var TemplateEngine = function(tpl, data) {
    tpl = tpl.trim();
    var re = /{{([^}}]+)?}}/g,
        code = 'var r=[];\n',
        cursor = 0, match;
    var add = function(line, js) {
    js? code += 'r.push("' + data[line] + '");\n' :
        code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
    }
    var match;
    while(match = re.exec(tpl)) {
        add(tpl.slice(cursor, match.index));
        add(match[1], true); // <-- say that this is actually valid js
        cursor = match.index + match[0].length;
    }
    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");'; // <-- return the result
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}