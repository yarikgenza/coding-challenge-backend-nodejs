import { Request, Response } from 'express';
import CaseService from '../services/cases.service';

const listCases = async (req: Request, res: Response) => {
    try {
        const cases = await CaseService.getList();
        return res.json(cases);
    } catch (error) {
        return res
        .status(500)
        .json({ error: error.message });
    }
};

const getCase = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const item = await CaseService.getOneById(id);
        if (item) {
            return res.json(item)
        } else {
            return res.status(404).send('Not Found');
        }
    } catch (error) {
        return res
        .status(500)
        .json({ error: error.message });
    }
};

const createNewCase = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const createdCase = await CaseService.createNew(body);
        res.send(createdCase);
    } catch (error) {
        return res
        .status(422)
        .json({ error: error.message });
    };
};

const resolveCase = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resolvedCase = await CaseService.resolve(id);
        return res.json(resolvedCase);
    } catch (error) {
        return res
        .status(500)
        .json({ error: error.message });
    }
};

export default {
    listCases,
    getCase,
    createNewCase,
    resolveCase,
};
