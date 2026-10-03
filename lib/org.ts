import { auth, clerkClient } from "@clerk/nextjs/server";

export interface CurrentOrgInfo {
  id: string;
  name: string;
  slug: string | null;
  role?: string | null;
  autoCreated?: boolean;
}

export async function getCurrentOrg(): Promise<CurrentOrgInfo | null> {
  const { userId, orgId, orgRole, orgSlug } = await auth();

  if (!userId) {
    return null;
  }

  const client = await clerkClient();

  if (orgId) {
    try {
      const org = await client.organizations.getOrganization({ organizationId: orgId });
      return {
        id: org.id,
        name: org.name,
        slug: org.slug || orgSlug || null,
        role: orgRole || null,
      };
    } catch {
      // Fall through to list or create if orgId lookup fails
    }
  }

  try {
    const membershipsResponse = await client.users.getOrganizationMembershipList({ userId });
    const memberships = membershipsResponse.data || [];

    if (memberships.length > 0) {
      const firstOrg = memberships[0].organization;
      return {
        id: firstOrg.id,
        name: firstOrg.name,
        slug: firstOrg.slug,
        role: memberships[0].role,
      };
    }
  } catch {
    // Fall through to auto-create if membership lookup fails
  }

  try {
    const user = await client.users.getUser(userId);
    const displayName =
      user.firstName ||
      user.username ||
      (user.emailAddresses[0]?.emailAddress ? user.emailAddresses[0].emailAddress.split("@")[0] : "Personal");

    const newOrg = await client.organizations.createOrganization({
      name: `${displayName}'s Team`,
      createdBy: userId,
    });

    return {
      id: newOrg.id,
      name: newOrg.name,
      slug: newOrg.slug,
      role: "org:admin",
      autoCreated: true,
    };
  } catch (err) {
    console.error("Failed to auto-create organization for user:", err);
    return null;
  }
}
