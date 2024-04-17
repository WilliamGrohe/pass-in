import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function getAllEvents(app: FastifyInstance){
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events', {
      schema: {
        summary: 'Get an list of all events',
        tags: ['events'],
        response: {
          200: z.object({
            events: z.array(
              z.object({
                id: z.string().uuid(),
                title: z.string(),
                details: z.string().nullable(),
                createdAt: z.date().nullable(),
                maximumAttendees: z.number().int().nullable(),
                attendeesAmount: z.number().int(),
              }),
            ),
          }),
        },
      }
    }, async (request, reply) => {
      const a = request.body

      const events = await prisma.event.findMany({
        select: {
          id: true,
          title: true,
          details: true,
          createdAt: true,
          maximumAttendees: true,
          _count: {
            select: {
              attendees: true
            }
          }
        },
      })

      if(events === null){
        throw new BadRequest('Evento não encontrado.')
      }

      return reply.send({ 
        events: events.map(event => {
          return {
            id: event.id,
            title: event.title,
            details: event.details,
            createdAt: event.createdAt,
            maximumAttendees: event.maximumAttendees,
            attendeesAmount: event._count.attendees,
          }
        }),
      })

    })
}