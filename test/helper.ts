const models = require('../src/models');

import { CaseFixture, OfficerFixture } from './fixtures';

export const createOfficer = () => models.Officer.create(OfficerFixture);
export const removeOfficer = (id: string) => models.Officer.destroy({ where: { id }});
export const removeAllOfficers = () => models.Officer.destroy({ truncate: true });

export const createCase = () => models.Case.create(CaseFixture);
export const removeCase = (id: string) => models.Case.destroy({ where: { id }});
export const removeAllCases = () => models.Case.destroy({ truncate: true });
