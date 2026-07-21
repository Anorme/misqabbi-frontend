import PolicyPageLayout from '../components/legal/PolicyPageLayout';
import { TERMS_OF_SERVICE } from '../constants/legal/termsOfService';

const TermsOfService = () => {
  return <PolicyPageLayout policy={TERMS_OF_SERVICE} />;
};

export default TermsOfService;
