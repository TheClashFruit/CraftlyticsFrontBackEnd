import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: {
    type: BigInt,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  roles: [
    new mongoose.Schema({
      user: {
        type: BigInt,
        required: true,
        unique: true
      },
      roleTitle: {
        type: String,
        required: true
      },
      permissions: {
        type: Number,
        required: true
      },
    }, {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
    })
  ],
  apiKeys: [
    new mongoose.Schema({
      id: {
        type: BigInt,
        required: true,
        unique: true,
        primaryKey: true
      },
      name: {
        type: String,
        required: true
      },
      key: {
        type: String,
        required: true
      },
    }, {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
    })
  ],
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
