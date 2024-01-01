import axios from "@/core/axios";
import { Mentor, MentorInput } from "../api/dto/mentors.dto";

const graphqlRequest = async (query, variables = {}) => {
  const response = await axios.post("/graphql", { query, variables });
  return response.data.data;
};

export const getAllMentors = async (): Promise<Mentor[]> => {
  const query = `
    query GetAllMentors {
      mentors {
        id
        fullName
      }
    }
  `;
  return graphqlRequest(query).then((data) => data.mentors);
};

export const createMentor = async (
  createMentorDto: MentorInput,
): Promise<any> => {
  const mutation = `
    mutation CreateMentor($createMentorDto: CreateMentorDto!) {
      createMentor(createMentorDto: $createMentorDto) {
        id
        fullName
      }
    }
  `;
  return graphqlRequest(mutation, { createMentorDto });
};

export const updateMentor = async (
  id: number,
  updateMentorDto: MentorInput,
): Promise<any> => {
  const mutation = `
    mutation UpdateMentor($id: Int!, $updateMentorDto: UpdateMentorDto!) {
      updateMentor(id: $id, updateMentorDto: $updateMentorDto) {
        id
        fullName
      }
    }
  `;
  return graphqlRequest(mutation, { id, updateMentorDto });
};

export const removeMentor = (id: number): Promise<void> => {
  const mutation = `
    mutation RemoveMentor($id: Int!) {
      removeMentor(id: $id)
    }
  `;
  return graphqlRequest(mutation, { id });
};
