import { Request, Response } from "express";
import {
  create,
  findById,
  findAll,
  update,
  deleteQuestion,
} from "../services/question.service";
import { handleResponseError } from "../utils/global";

export async function createQuestionController(req: Request, res: Response) {
  const { text, categoryId } = req.body;

  try {
    const question = await create({ text, categoryId });
    return res.send(question).status(201);
  } catch (error) {
    console.error(error);
    handleResponseError(res, error);
  }
}

export async function getQuestionByIdController(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const question = await findById(parseInt(id, 10));
    if (question) {
      res.status(200).send(question);
    } else {
      res.status(404).send({ error: "Question not found" });
    }
  } catch (error) {
    handleResponseError(res, error);
  }
}

export async function getAllQuestionsController(req: Request, res: Response) {
  try {
    const questions = await findAll();
    res.status(200).send(questions);
  } catch (error) {
    handleResponseError(res, error);
  }
}

export async function updateQuestionController(req: Request, res: Response) {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedQuestion = await update(parseInt(id, 10), {
      text,
    });
    res.status(200).send(updatedQuestion);
  } catch (error) {
    handleResponseError(res, error);
  }
}

export async function deleteQuestionController(req: Request, res: Response) {
  const questionId: number = parseInt(req.params.id);

  try {
    const deletedQuestion = await deleteQuestion(questionId);

    if (!deleteQuestion) {
      console.error("Question not found");
      return res.status(404).send("Question not found");
    }

    return res.send(deleteQuestion).status(200);
  } catch (error) {
    handleResponseError(res, error);
  }
}
