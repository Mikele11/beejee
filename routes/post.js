const express = require('express');
const router = express.Router();
const Task = require('../models/Task.js');
const passport = require('passport');
require('../config/passport')(passport);

const getToken = headers => {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
router.get('/', passport.authenticate('jwt', { session: false}), (req, res, next)=> {
  const token = getToken(req.headers);
  if (token) {
    Task.find((err, post)=> {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/:page/:perPage', passport.authenticate('jwt', { session: false}), async(req, res, next)=> {
  const token = getToken(req.headers);
  const page = +req.params.page || 1; // page
  const size = +req.params.perPage || 10; // count on 1 page
  let query = {};
  query.skip = size * (page -  1 )
  query.limit = size
  if (token) {
    const numOfList = await Task.count({});
    Task.find({}, {}, query,(err, post)=> {
      if (err) return next(err);
      res.json({
        list: post, 
        currentPage: page, 
        pages: Math.ceil(numOfList / size), 
        totalCount: numOfList
       });
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.get('/:id', passport.authenticate('jwt', { session: false}), (req, res, next)=> {
  const token = getToken(req.headers);
  if (token) {
    Task.findById(req.params.id, (err, post)=> {
      if (err) return next(err);
      res.json(post);
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/', passport.authenticate('jwt', { session: false}), (req, res, next)=> {
  const token = getToken(req.headers);
  if (token) {
    Task.create(req.body, (err, post)=> {
      if (err) return next(err);
      res.json(post);
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.put('/:id', passport.authenticate('jwt', { session: false}), (req, res, next)=> {
  const token = getToken(req.headers);
  if (token) {
    Task.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, post)=> {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false}), (req, res, next)=> {
  const token = getToken(req.headers);
  if (token) {
    Task.findByIdAndRemove(req.params.id, (err, post)=> {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;