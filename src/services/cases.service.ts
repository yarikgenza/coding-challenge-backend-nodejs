import Sequelize from 'sequelize';
import { Case, CaseStatus, CaseBody } from '../models/types';

const models: any = require('../models');

interface ICasesService {
    getList(): Promise<Case[]>,
    getOneById(id: string): Promise<Case>,
    createNew(arg0: CaseBody): Promise<Case>,
    resolve(id: string): Promise<Case>,
    assignToFreeOfficer(caseId: string): Promise<Case>,
    assignPendingCases(): Promise<void>,
};

class CasesService implements ICasesService {
    getList = async () => models.Case.findAll();

    getOneById = async (id: string) => models.Case.findByPk(id, { include: models.Officer });

    createNew = async (body: Case) => {
        const createdCase = await models.Case.create(body);
        const assignedCase = await this.assignToFreeOfficer(createdCase.id);
        return assignedCase || createdCase;
    }

    resolve = async (id: string) => {
        const resolvedCase = await models.Case.findByPk(id);
        resolvedCase.officerId = null;
        resolvedCase.status = CaseStatus.RESOLVED;
        await resolvedCase.save();
        return resolvedCase;
    }

    public assignToFreeOfficer = async (caseId: string) => {
        const freeOfficer = await models.Officer.findOne({
            where: Sequelize.literal('"Case"."officerId" IS null'),
            include: models.Case,
            attributes: ['id'],
        });
        
        if (freeOfficer) {
            const targetCase = await models.Case.findByPk(caseId);
            targetCase.officerId = freeOfficer.id;
            targetCase.status = CaseStatus.ASSIGNED;
            await targetCase.save();
            return targetCase;
        }
    }

    public assignPendingCases = async () => {
        const {
            count: freeOfficersCount,
            rows: freeOfficers
        } = await models.Officer.findAndCountAll({
            where: Sequelize.literal('"Case"."officerId" IS null'),
            include: models.Case,
            attributes: ['id'],
        });

        const pendingCases = await models.Case.findAll({
            where: { status: CaseStatus.PENDING },
            limit: freeOfficersCount,
        });

        const matchCasesWithOfficers = pendingCases.map(async (item: any, index: number) => {
                item.officerId = freeOfficers[index].id,
                item.status = CaseStatus.ASSIGNED;
                await item.save();
        });

        await Promise.all(matchCasesWithOfficers);
    }
}

export default new CasesService();
