import type { VerificationCheckItem } from '../types';
import { INITIAL_VERIFICATION_CHECKS } from '../data/mock/verification';

export class VerificationService {
  public static getChecks(): VerificationCheckItem[] {
    return INITIAL_VERIFICATION_CHECKS;
  }
}
