(function(context, undef) {
	var modules = {};
	function defined(name) {
		return Object.prototype.hasOwnProperty.call(modules, name);
	}
	function define(name, deps, factory) {
		if (defined(name)) throw new Error("Multiple modules with name " + name);
		modules[name] = { deps: deps, factory: factory, state: 0, module: null }
	}
	function require(name) {
		if (!defined(name)) throw new Error("Undefined module " + name);
		var module = modules[name];
		if (module.state === 2) return module.module;
		if (module.state === 1) throw new Error("Circular dependency including " + name);
		module.state = 1;
		module.module = module.factory.apply(undef, module.deps.map(require));
		module.state = 2;
		return module.module;
	}
	context.define = define;
	context.require = require;
})(window);
