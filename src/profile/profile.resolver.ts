import { Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { ProfileModel } from './models/profile.model';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileModel, {
    description: 'Возвращает цифровую визитку: профиль, навыки, опыт работы и проекты',
  })
  profile() {
    return this.profileService.getProfile();
  }
}
