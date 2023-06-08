import { Request, Response } from "express";
import {
  create,
  findAnswerById,
  findAll,
  update,
  deleteAnswer,
} from "../services/answer.service";
import { handleResponseError } from "../utils/global";

export async function createAnswerController(req: Request, res: Response) {
  const { questionId, text, isCorrect } = req.body;

  try {
    const answer = await create({ questionId, text, isCorrect });
    return res.send(answer).status(201);
  } catch (error) {
    console.error(error);
    handleResponseError(res, error);
  }
}

export async function getAnswerByIdController(req: Request, res: Response) {
  const answerId: number = parseInt(req.params.id);

  try {
    const answer = await findAnswerById(answerId);
    if (answer) {
      res.status(200).send(answer);
    } else {
      res.status(404).send({ error: "Answer not found" });
    }
  } catch (error) {
    handleResponseError(res, error);
  }
}

export async function getAllAnswersController(req: Request, res: Response) {
  try {
    const answers = await findAll();
    res.status(200).send(answers);
  } catch (error) {
    handleResponseError(res, error);
  }
}

export async function updateAnswerController(req: Request, res: Response) {
  const answerId = parseInt(req.params.id);
  const { text, isCorrect, questionId } = req.body;

  try {
    const updatedAnswer = await update(answerId, {
      text,
      isCorrect,
      questionId,
    });
    res.status(200).send(updatedAnswer);
  } catch (error) {
    handleResponseError(res, error);
  }
}

export async function deleteAnswerController(req: Request, res: Response) {
  const answerId: number = parseInt(req.params.id);

  try {
    const deletedAnswer = await deleteAnswer(answerId);
    if (!deleteAnswer) {
      console.error("answer not found");
      return res.status(404).send("answer not found");
    }
    return res.send(deletedAnswer).status(200);
  } catch (error) {
    handleResponseError(res, error);
  }
}
