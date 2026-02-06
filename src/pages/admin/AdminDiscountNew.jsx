import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createAdminDiscount, generateAdminDiscountCode } from '../../api/adminDiscounts';
import { useAdminProducts } from '../../hooks/queries/useAdmin';
import DiscountForm from '../../components/admin/DiscountForm';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const AdminDiscountNew = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: productsData } = useAdminProducts({ page: 1, limit: 200 });
  const productOptions = productsData?.data || [];

  const handleSubmit = async payload => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await createAdminDiscount(payload);
      showSuccessToast('Discount created');
      const id = res?.data?._id;
      if (id) navigate(`/admin/discounts/${id}`);
      else navigate('/admin/discounts');
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to create discount';
      setError(msg);
      showErrorToast(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCode = () => generateAdminDiscountCode({});

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bebas text-msq-purple-rich uppercase tracking-wide">
          Create discount
        </h1>
        <button
          type="button"
          className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate('/admin/discounts')}
        >
          Back to list
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <DiscountForm
          initialData={null}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          onGenerateCode={handleGenerateCode}
          productOptions={productOptions}
          codeReadOnly={false}
        />
      </div>
    </div>
  );
};

export default AdminDiscountNew;
