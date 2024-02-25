// import { OrganizationList, OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";
// import OrganizationProfilePage from "../organization-profile/[[...organization-profile]]/page";
import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';

export default function TeamPage() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                <div className="mt-5 mb-10 ml-5">
                    <Card>
                        <Flex
                            justifyContent="center" // Center items horizontally
                            alignItems="center" // Center items vertically
                            className="space-x-2"
                        >
                            yo{/* <OrganizationSwitcher /> */}
                        </Flex>
                    </Card>
                </div>
            </Grid>
        </main>
    );
}