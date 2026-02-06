import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { updateAdminDiscount } from '../../api/adminDiscounts';
import { useAdminDiscount } from '../../hooks/queries/useAdmin';
import { useAdminProducts } from '../../hooks/queries/useAdmin';
import DiscountForm from '../../components/admin/DiscountForm';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const AdminDiscountEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    data: discountData,
    isLoading: loadingDiscount,
    isError,
    error: queryError,
  } = useAdminDiscount(id);
  const { data: productsData } = useAdminProducts({ page: 1, limit: 200 });

  const discount = discountData?.data || null;
  const productOptions = productsData?.data || [];
  const errMsg = isError
    ? queryError?.response?.data?.error || queryError?.message || 'Failed to load discount'
    : null;

  const handleSubmit = async payload => {
    setIsLoading(true);
    setError(null);
    try {
      await updateAdminDiscount(id, payload);
      showSuccessToast('Discount updated');
      navigate(`/admin/discounts/${id}`);
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to update discount';
      setError(msg);
      showErrorToast(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingDiscount)
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size={48} />
      </div>
    );
  if (errMsg)
    return (
      <div>
        <button
          className="mb-4 px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate('/admin/discounts')}
        >
          Back to list
        </button>
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{errMsg}</div>
      </div>
    );
  if (!discount)
    return (
      <div>
        <button
          className="mb-4 px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate('/admin/discounts')}
        >
          Back to list
        </button>
        <p className="text-gray-500">Discount not found.</p>
      </div>
    );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bebas text-msq-purple-rich uppercase tracking-wide">
          Edit discount: {discount.code}
        </h1>
        <button
          type="button"
          className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => navigate(`/admin/discounts/${id}`)}
        >
          Back to detail
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <DiscountForm
          initialData={discount}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          onGenerateCode={null}
          productOptions={productOptions}
          codeReadOnly={true}
        />
      </div>
    </div>
  );
};

export default AdminDiscountEdit;
