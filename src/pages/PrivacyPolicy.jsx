import PolicyPageLayout from '../components/legal/PolicyPageLayout';
import { PRIVACY_POLICY } from '../constants/legal/privacyPolicy';

const PrivacyPolicy = () => {
  return <PolicyPageLayout policy={PRIVACY_POLICY} />;
};

export default PrivacyPolicy;
