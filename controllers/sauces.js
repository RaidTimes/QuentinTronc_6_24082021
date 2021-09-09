const Thing = require('../models/thing');
const fs = require('fs');
const thing = require('../models/thing');

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.sauce);
    delete thingObject._id;
    const thing = new Thing({
      ...thingObject,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => console.log(error) || res.status(400).json({ error }));
};

exports.modifyingThing = (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Thing.updateOne({ _id: req.params.id, userId: req.userId}, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({_id: req.params.id, userId: req.userId })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyLike = (req, res, next) => {
  Thing.findOne({_id: req.params.id})
    .then(thing => {
      if (req.body.like === 1) {
        if(!thing.usersLiked.includes(req.userId)){
          thing.usersLiked.push(req.userId)
          thing.likes ++;
        }
      } else if (req.body.like === 0) {
        if(thing.usersLiked.includes(req.userId)){
          thing.usersLiked.pop(req.userId)
          thing.likes --;
        }
        if(thing.usersDisliked.includes(req.userId)){
          thing.usersDisliked.pop(req.userId)
          thing.dislikes --;
        }
      } else if (req.body.like === -1) {
        if(!thing.usersDisliked.includes(req.userId)){
          thing.usersDisliked.push(req.userId)
          thing.dislikes ++;
        }
      }
      thing.save()
        .then(() => {res.status(201).json({message: 'Rating saved successfully!'});
      })
    }
  ) 
  .catch((error) => {res.status(400).json({error: error});
  });
};