const Result = require('../models/results');

// Get all results
exports.getResults = async (req, res) => {
  const results = await Result.find().sort({ createdAt: -1 });
  res.json(results);
};

// Create new result
exports.createResult = async (req, res) => {
  const { candidateName, email, score } = req.body;

  if (!candidateName || !email || score == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const status = score >= 50 ? 'PASS' : 'FAIL';

  const result = new Result({ candidateName, email, score, status });
  await result.save();

  res.status(201).json(result);
};

// Update result
exports.updateResult = async (req, res) => {
  const { id } = req.params;
  const { candidateName, email, score } = req.body;

  if (score == null) {
    return res.status(400).json({ message: 'Score is required' });
  }

  const status = score >= 50 ? 'PASS' : 'FAIL';

  const result = await Result.findByIdAndUpdate(
    id,
    { candidateName, email, score, status },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({ message: 'Result not found' });
  }

  res.json(result);
};

// Delete result
exports.deleteResult = async (req, res) => {
  const { id } = req.params;

  const result = await Result.findByIdAndDelete(id);

  if (!result) {
    return res.status(404).json({ message: 'Result not found' });
  }

  res.json({ message: 'Result deleted successfully' });
};
