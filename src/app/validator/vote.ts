import * as Joi from 'joi';
import { provide } from 'midway';

import Validator from './validator';

@provide('voteValidator')
export default class VoteValidator extends Validator {
  getAllVotes(value: any) {
    return this.validate(value, {
      limit: Joi.number()
        .optional()
        .default(10),
      offset: Joi.number()
        .optional()
        .default(0),
    });
  }

  vote(value: any) {
    return this.validate(value, {
      name: Joi.string()
        .trim()
        .required(),
      startDate: Joi.date()
        .timestamp('unix')
        .required(),
      endDate: Joi.date()
        .timestamp('unix')
        .required(),
    });
  }

  delCandidates(value: any) {
    return this.validate(value, {
      voteId: Joi.number().required(),
      candidateId: Joi.number().required(),
    });
  }

  voteId(value: any) {
    return this.validate(value, {
      voteId: Joi.number().required(),
    });
  }

  addCandidates(body: any) {
    return this.validate(
      body,
      Joi.array()
        .min(1)
        .items({
          name: Joi.string()
            .trim()
            .required(),
        })
    );
  }
}
