const express = require('express');
const model = require('./model')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
app.use(cors());

const Employee = model.Employee;
const Skills = model.Skills;
const Performance = model.Performance;

mongoose.connect('mongodb://localhost:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(bodyParser)
app.get('/api1/', async (req, res) => {
    const lowskillCountThreshold = req.body.lowskillCountThreshold;
    const highperformanceThreshold = req.body.highperformanceThreshold;
    const lowexperienceThreshold = req.body.lowexperienceThreshold
    // Find Employees with a lower skill count and high-performance index and low experience.
    // Find Employees with higher skill count and low-performance index and high experience.
    res.send("test")
    // Define API function
    
  async function findTopPerformers(skillCountThreshold, performanceThreshold, experienceThreshold) {
    try {
      // Aggregate data from all tables
      const results = await Performance.aggregate([
        {
          $lookup: {
            from: 'Employee',
            localField: 'emp_id',
            foreignField: '_id',
            as: 'employee',
          },
        },
        {
          $lookup: {
            from: 'Skill',
            localField: 'skill_id',
            foreignField: '_id',
            as: 'skill',
          },
        },
        {
          $match: {
            'skill.length': { $lt: skillCountThreshold },
            'performance_percentage': { $gt: performanceThreshold },
            'employee.experience': { $lt: experienceThreshold },
          },
        },
        {
          $project: {
            _id: 0,
            employeeName: '$employee.name',
            skills: '$skill.skill_name',
            performance: '$performance_percentage',
            experience: '$employee.experience',
          },
        },
      ]);
  
      // Return results
      
      return results;
    } catch (error) {
      console.error(error);
      return [];
    }
  }    

  
  findTopPerformers(lowskillCountThreshold, highperformanceThreshold, lowexperienceThreshold)
    .then((results) => {
        res.json(results);
      console.log('Top performers:', results);
    })
    .catch((error) => {
        res.status(500).json({ error: err.message });
      console.error('Error finding performers:', error);
    });
    
});
app.get('/api2/', async (req, res) => {

    const highskillCountThreshold = req.body.highskillCountThreshold;
    const lowperformanceThreshold = req.body.lowperformanceThreshold;
    const highexperienceThreshold = req.body.highexperienceThreshold
    //  API 2: Find Employees with higher skill count and low-performance index and high experience.
    async function findTopPerformers(skillCountThreshold, performanceThreshold, experienceThreshold) {
        try {
          // Aggregate data from all tables
          const results = await Performance.aggregate([
            {
              $lookup: {
                from: 'Employee',
                localField: 'emp_id',
                foreignField: '_id',
                as: 'employee',
              },
            },
            {
              $lookup: {
                from: 'Skill',
                localField: 'skill_id',
                foreignField: '_id',
                as: 'skill',
              },
            },
            {
              $match: {
                'skill.length': { $gt: skillCountThreshold },
                'performance_percentage': { $lt: performanceThreshold },
                'employee.experience': { $gt: experienceThreshold },
              },
            },
            {
              $project: {
                _id: 0,
                employeeName: '$employee.name',
                skills: '$skill.skill_name',
                performance: '$performance_percentage',
                experience: '$employee.experience',
              },
            },
          ]);
      
          // Return results
          return results;
        } catch (error) {
          console.error(error);
          return [];
        }
      }    
    
      
      findTopPerformers(highskillCountThreshold, lowperformanceThreshold, highexperienceThreshold)
        .then((results) => {
          console.log('Top performers:', results);
          res.json(results);
        })
        .catch((error) => {
          console.error('Error finding performers:', error);
          res.status(500).json({ error: err.message });
        });
});

app.get('/api3/', async (req, res) => {
    res.send('3rd working')
    // Top 3 salaries in all departments
    try {
        const salaries = await Employee.find({}).limit(3).sort({salary:1}).group('department').select('salary')

        res.json(salaries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => 
console.log('Server listening on port 3000')
);
