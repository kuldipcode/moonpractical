const mongoose = require('mongoose');
// Define Schemas
const EmployeeSchema = new mongoose.Schema({
    skill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    performance_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Performance' },
    name: String,
    experience: Number,
    salary: Number,
    deparment: String
  });
  
  const SkillSchema = new mongoose.Schema({
    emp_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    performance_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Performance' },
    skill_name: String,
  });
  
  const PerformanceSchema = new mongoose.Schema({
    emp_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    skill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    performance_percentage: Number,
  });
  
  // Build Models
  const Employee = mongoose.model('Employee', EmployeeSchema);
  const Skills = mongoose.model('Skills', SkillSchema);
  const Performance = mongoose.model('Performance', PerformanceSchema);
  
  
module.exports = {
    Employee, Skills, Performance
}