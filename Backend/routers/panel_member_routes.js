const express = require('express');
const router = express.Router();
const ResearchTopic = require('../models/ResearchTopic');
const StudentGroup = require('../models/StudentGroup');
const Mark = require('../models/Marking');
const PresentationEvaluation = require("../models/PresentationEvaluation");
const PanelMember = require("../models/PanelMember");

router.post('/panelMemberRegister', (req, res,  next) => {
    // req.body._id = req.body.id;
    PanelMember.create(req.body).then((panelMember) => {
        res.send(panelMember);
    }).catch(next);
});

router.route('/viewTopics').get((req, res) => {
    ResearchTopic.find().then((topics) => {
        res.json(topics);
    }).catch(err => {
        console.log(err);
    })
});

router.route('/viewGroup/:id').get(async (req, res) => {
    let groupId = req.params.id;
    await StudentGroup.find({groupId: groupId}).then((details) => {
        res.json(details)
    })

});

router.route('/viewGroup').get(async (req, res) => {
    // let groupId = req.params.id;
    await StudentGroup.find().then((details) => {
        res.json(details)
    })

});

router.route('/viewMarking').get((req,res) => {
    Mark.find().then((marking) => {
        res.json(marking);
    }).catch(err => {
        console.log(err)
    });
});

router.post('/addPresentationMarking', (req, res, next) => {
        console.log(req.body)
        req.body._evaluationId = 'P' + Math.floor(Math.random() * 10000);
        PresentationEvaluation.create(req.body).then((data) => {
            res.send(data);
        }).catch(next);

});

router.route('/viewFeedback').get((req,res) => {
    PresentationEvaluation.find().then((feedback) => {
        res.json(feedback);
    }).catch(err => {
        console.log(err)
    });
});

router.route("/updateFeedback/:id").put(async (req, res) => {
    let id = req.params.id;
    const {_id, presentationMark, presentationFeedback} = req.body;
    const updateFeedback = {
        _id,
        presentationMark,
        presentationFeedback
    }
    const update = await PresentationEvaluation.findOneAndUpdate(id, updateFeedback)
        .then((feedback) => {
            res.status(200).send({status: "Feedback updated", feedback: feedback})
        }).catch((err) => {
            res.status(500).send({status: "Error", error: err.message})
        })

});

router.route("/deleteById/:id").delete(async (req, res) => {
    let id = req.params.id;
    await PresentationEvaluation.findOneAndDelete(id)
        .then(() => {
            res.status(200).send({status: "Feedback deleted"})
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error", error: err.message})
        })
});


module.exports = router;
