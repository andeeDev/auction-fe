import CategoryBar from '../../components/CategoryBar';
import CreateAuctionForm from '../../components/CreateAuctionForm';

export default function CreateAuctionProduct() {
    return <div>
        <div className={'m-auto grid max-w-5xl grid-cols-6 justify-center gap-4'}>
            <CategoryBar />
            <div className={'col-span-5 mt-4 self-end '}>
                <div className={'mb-4 flex justify-center'}>
                    <CreateAuctionForm />
                </div>
            </div>
        </div>
    </div>;
}