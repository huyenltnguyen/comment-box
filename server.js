import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Comment from './model/comment';

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/comment_box');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// ROUTES
router.get('/', (req, res) => res.json({ message: 'API Initialized' }));

app.use('/api', router);

router.route('/comments')
  // INDEX ROUTE
  .get((req, res) => {
    Comment.find({}, (err, comments) => {
      if (err) {
        res.send(err);
      } else {
        res.json(comments);
      }
    });
  })
  // POST ROUTE
  .post((req, res) => {
    let comment = new Comment();
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save((err, newComment) => {
      err ? res.send(err) : res.json({ message: 'Comment successfully added!' });
    });
  });

router.route('/comments/:comment_id')
  // UPDATE ROUTE
  .put((req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.send(err);
      } else {
        req.body.author ? foundComment.author = req.body.author : null;
        req.body.text ? foundComment.text = req.body.text : null;

        foundComment.save((err) => {
          err ? res.send(err) : res.json({ message: 'Comment successfully updated!' });
        });
      }
    });
  })
  // DELETE ROUTE
  .delete((req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, foundComment) => {
      err ? res.send(err) : res.json({ message: 'Comment successfully deleted!' });
    });
  })

app.listen(PORT, () => console.log(`API is running on port ${PORT}`));