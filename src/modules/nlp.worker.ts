import { getVector } from './nlp';

export type nlpWorkerResult = { vector: number[] | undefined; id: number };

self.onmessage = async ({
  data,
}: {
  data: {
    text: string;
    modelName: string;
    id: number;
  };
}) => {
  const message: nlpWorkerResult = { vector: undefined, id: data.id };
  try {
    const vector = await getVector(data.text, data.modelName);
    message.vector = vector;
  } catch (error) {
    // Handle any errors here
    console.error(error);
  }
  self.postMessage(message);
};
