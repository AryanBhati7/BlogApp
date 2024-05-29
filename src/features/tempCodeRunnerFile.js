 .addCase(fetchPublicPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.publicPosts = action.payload.sort(
          (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
        );
      })