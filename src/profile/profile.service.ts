import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile() {
    const profile = await this.prisma.profile.findFirst({
      orderBy: { id: 'asc' },
      include: {
        links: true,
        skills: true,
        experience: { orderBy: { periodStart: 'desc' } },
        projects: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile is not seeded yet');
    }

    return profile;
  }
}
