const ctrl = require('./ctrl'),
  to = require("await-to-js").default,
  Response = require("../../../helpers/response");

module.exports = [

  {
    path: "/api/experimentData",
    method: "GET",
    require: {
      token: false
    },
    handler: async (req, res) => {
      const [err, groups] = await to(ctrl.findAll());
      return Response.build(res, [err, groups]);
    }
  },
  {
    path: "/api/experimentData/:id",
    method: "GET",
    require: {
      token: false
    },
    handler: async (req, res) => {
      const [err, group] = await to(ctrl.findById(req.params.id));
      return Response.build(res, [err, !group, group], [500, 404, 200]);
    }
  },
  {
    path: "/api/experimentData",
    method: "POST",
    require: {
      token: false
    },
    handler: async (req, res) => {
      const [err, group] = await to(ctrl.create(req.body));
      return Response.build(res, [err, group]);
    }
  },
  {
    path: "/api/experimentData/:id",
    method: "PUT",
    require: {
      token: false
    },
    handler: async (req, res) => {
      const [err, group] = await to(ctrl.update(req.params.id, req.body));
      return Response.build(res, [err, group]);
    }
  },
  {
    path: "/api/experimentData/:id",
    method: "DELETE",
    require: {
      token: false
    },
    handler: async (req, res) => {
      const [err, group] = await to(ctrl.delete(req.params.id));
      return Response.build(res, [err, group]);
    }
  }
];
